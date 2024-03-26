import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import Genaral from './genaral'
import DeviceSettings from './DeviceSettings';
import OnlineStoreSettings from './OnlineStoreSettings';

const UserIndex = ({ match }) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/generalsettings`} />
        <Route path={`${match.url}/generalsettings`} component={Genaral} />
        <Route path={`${match.url}/devicesettings`} component={DeviceSettings} />
        <Route path={`${match.url}/onlinestoresettings`} component={OnlineStoreSettings} />
    </Switch>
)

export default UserIndex