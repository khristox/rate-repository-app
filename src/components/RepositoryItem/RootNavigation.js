import { createNavigationContainerRef } from '@react-navigation/native';
import { createRef, Component } from 'react';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  console.log(name, params,navigationRef.current);  
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
export const isReadyRef = createRef();
