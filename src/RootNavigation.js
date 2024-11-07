//import * as React from 'react';
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

//export const navigationRef = React.createRef();

export function navigate(name, params) {
 // navigationRef.current?.navigate(name, params);
 console.log('RootNa',name,params);
 if (navigationRef.isReady()) {
  navigationRef.navigate(name, params);
}

}