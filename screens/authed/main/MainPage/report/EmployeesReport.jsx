import React, { useEffect, useState } from "react";
import { employeesState, myDeviceDetailsState, storeDetailState, woocommerceState } from "state/state";
import { auth, db } from "state/firebaseConfig";
const tz = require("moment-timezone");
import { Button, Modal, Text, View } from "react-native";
import { useHistory } from "react-router-dom";

const EmployeesReport = () => {
    const employees = employeesState.use()
    const history = useHistory();

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="page-title">
                        <h4>Employee Report</h4>
                        <h6>Manage your Employee Report</h6>
                    </div>
                </div>
                {/* /product list */}
                <div className="card">
                    <div className="card-body">
                        {employees.length > 0 ? employees.map((employee, index) => {
                            return (
                                <View style={{ marginBottom: 10 }} key={index}><Button title={`View/Edit Employee ${employee.name}`} onPress={() => {
                                    history.push(`/authed/report/editemployee/${index}`)
                                }} />
                                </View>
                            )
                        }) : <Text>No Employees</Text>}
                    </div>
                </div>
                {/* /product list */}
            </div>
        </div>
    );
};

export default EmployeesReport;
