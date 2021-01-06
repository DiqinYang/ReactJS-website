import React, { Component, useEffect, useState } from "react";
import { ordersDb } from "../../firebase/firebase";

import Dashboard from "./Dashboard";

const DashboardController = () => {
  const [orders, setOrders] = useState(0);
  const [nrOfOrder, setNrOfOrder] = useState(0);

  var sum = 0;
  var count = 0;
  useEffect(() => {
    ordersDb.on("value", (snap) => {
      snap.forEach(function (childSnap) {
        count++;
        sum += childSnap.val().totalPrice;
        //console.log(childSnap.child("menuItems").val());
      });
      setOrders(sum);
      setNrOfOrder(count);
      //console.log(snap.key);
    });
  }, []);

  return <Dashboard orders={orders} nrOfOrder={nrOfOrder} />;
};

export default DashboardController;
