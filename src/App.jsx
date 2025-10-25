import React, { useEffect, useContext } from 'react';
import Routing from './Router.jsx';
import { DataProvider, DataContext } from './components/DataProvider/DataProvider.jsx';
import { reducer, initialState } from './Utility/reducer';
import { Type } from './Utility/action.type';
import { auth } from './Utility/firebase';

function AppContent() {
  // FIX: Proper context access
  const context = useContext(DataContext);
  
  // Check if context exists before destructuring
  if (!context) {
    console.error("DataContext is undefined - check DataProvider setup");
    return <div>Loading...</div>;
  }
  
  const [{ user }, dispatch] = context;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null
        });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <Routing />;
}

function App() {
  return (
    <DataProvider reducer={reducer} initialState={initialState}>
      <AppContent />
    </DataProvider>
  );
}

export default App;