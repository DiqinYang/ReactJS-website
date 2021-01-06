import React, {  useState } from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import InventoryDataService from '../../services/inventory.service';

export default function AddInventory() {    
    const initialInventoryItemState = {
        productName: "",
        currQuantity: 0,
        unitType: "",
        threshold: 0,
        redZone: 0
    };
    const [inventoryItem, setInventoryItem] = useState(initialInventoryItemState);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setInventoryItem({ ...inventoryItem, [name]: value });
    };

    const saveInventory = () => {
        var data = {
            productName: inventoryItem.productName,
            currQuantity: inventoryItem.currQuantity,
            unitType: inventoryItem.unitType,
            threshold: inventoryItem.threshold,
            redZone: inventoryItem.redZone
        };
        InventoryDataService.create(data);
    }

    return (
        <div>
            <div>
                <TextField name="productName" label="Name" onChange={handleInputChange} />
            </div>
            <div>
                <TextField name="currQuantity" label="Quantity" type="number" onChange={handleInputChange} />
                <TextField
                    onChange={handleInputChange}
                    name="unitType"
                    select
                    label="Unit"
                    variant="outlined"
                >
                    <option value="g">g</option>
                    <option value="ml">ml</option>                                
                </TextField>
            </div>
            <div>
                <TextField name="threshold" label="Threshold" type="number" onChange={handleInputChange} />
            </div>
            <div>
                <TextField name="redZone" label="Red Zone Threshold" type="number" onChange={handleInputChange} />
            </div>
            <div>
                <Button variant="contained" color="primary" onClick={saveInventory}>Add</Button>
            </div>
        </div>
    )
}
