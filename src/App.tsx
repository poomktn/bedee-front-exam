import React, {Dispatch, SetStateAction, createContext, useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootStack} from './routes';
import {NavigationContainer} from '@react-navigation/native';

type FormContextProps = {
  scoreGroup: Record<number, number>;
  setScoreGroup: Dispatch<SetStateAction<Record<string, number>>>;
};

export const FormContext = createContext<FormContextProps>({} as FormContextProps);

function App() {
  const [scoreGroup, setScoreGroup] = useState<Record<string, number>>({});
  return (
    <NativeBaseProvider>
      <SafeAreaProvider>
        <FormContext.Provider
          value={{
            scoreGroup,
            setScoreGroup,
          }}>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </FormContext.Provider>
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

export default App;
