import React, {  useState, useEffect  } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import InventoryDataService from '../../services/inventory.service';


const EditInventory = (props) => {
    const {edittedInventoryItem, edittedInventoryItemId} = props;
    const initialInventoryItemState = {
        productName: edittedInventoryItem.productName,
        redZone: edittedInventoryItem.redZone,
        threshold: edittedInventoryItem.threshold,
        currQuantity: edittedInventoryItem.currQuantity,
    };
    const [inventoryItem, setInventoryItem] = useState(initialInventoryItemState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setInventoryItem({ ...inventoryItem, [name]: value });
    };

    const saveInventory = () => {
        var data = {
            productName: inventoryItem.productName,
            redZone: inventoryItem.redZone,
            threshold: inventoryItem.threshold,
            currQuantity: inventoryItem.currQuantity
        };
        InventoryDataService.update(edittedInventoryItemId, data);
    };

    const onDataChange = (items) => {
        items.forEach((item) => {
          let id = item.key;
          let value = item.val();
        });
    };
    
    useEffect(() => {
        InventoryDataService.getAll().on("value", onDataChange);

        return () => {
            InventoryDataService.getAll().off("value", onDataChange);
        };
    }, []);

    return (
        <div>
            <div>
                <TextField name="productName" label="Name" defaultValue={edittedInventoryItem.productName} onChange={handleInputChange}>"dsfsf"</TextField>
            </div>
            <div>
                <TextField name="currQuantity" label="Current Quantity" defaultValue={edittedInventoryItem.currQuantity} type="number" onChange={handleInputChange} />
            </div>
            <div>
                <TextField name="redZone" label="Red Zone" defaultValue={edittedInventoryItem.redZone} type="number" onChange={handleInputChange} />
            </div>
            <div>
                <TextField name="threshold" label="Threshold" defaultValue={edittedInventoryItem.threshold} type="number" onChange={handleInputChange} />
            </div>
            <div>
                <Button variant="contained" color="primary" onClick={saveInventory}>Edit</Button>
            </div>
        </div>
    )
};

export default EditInventory;
