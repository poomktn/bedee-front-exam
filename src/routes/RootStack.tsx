import {
  NativeStackScreenProps,
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import type {ParamListBase} from '@react-navigation/native';
import {RandomQuiz} from './../pages';
import {ReactNode} from 'react';

type StackNavigatorOptions = {
  name: string;
  component: (props: NativeStackScreenProps<ParamListBase>) => ReactNode;
  options?: NativeStackNavigationOptions;
};

export const rootStackNavigator: StackNavigatorOptions[] = [
  {
    component: RandomQuiz,
    name: 'RandomQuiz',
    options: {headerShown: false},
  },
];

export const RootStack = () => {
  const STACK = createNativeStackNavigator();

  return (
    <STACK.Navigator initialRouteName={'RandomQuiz'}>
      {rootStackNavigator.map(({name, component, options}) => (
        <STACK.Screen
          key={name}
          component={component}
          name={name}
          options={options}
        />
      ))}
    </STACK.Navigator>
  );
};
