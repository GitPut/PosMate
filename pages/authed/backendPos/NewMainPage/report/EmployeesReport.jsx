import React, { useEffect, useState } from "react";
import { employeesState, myDeviceDetailsState, storeDetailState, woocommerceState } from "state/state";
import { auth, db } from "state/firebaseConfig";
const tz = require("moment-timezone");
import { Button, Modal, Text, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';
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
                        <View style={tw.style(['flex-1', 'p-5'])}>
                            {employees.length > 0 ? employees.map((employee, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => {
                                        history.push(`/authed/report/editemployee/${employee.id}`)
                                    }}
                                        style={tw.style(['flex', 'flex-row', 'justify-between', 'items-center', 'p-4', 'border-b', 'border-gray-200'])}
                                    >
                                        <Text>
                                            {employee.name}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }) : <Text>No Employees</Text>}
                        </View>
                    </div>
                </div>
                {/* /product list */}
            </div>
        </div>
    );
};

export default EmployeesReport;
