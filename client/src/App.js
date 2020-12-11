// import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import SidebarLeft from './SidebarLeft/SidebarLeft';
import SidebarRight from './SidebarRight/SidebarRight';
import Home from './Home/Home';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ReadMine from './ReadMine/ReadMine'
import { DataProvider } from './MinesContext';
import NewMine from './NewMine/NewMine';

const App = () => {




  return(
    
    
    <DataProvider>
      <Router>
        <div className='main_column'>
          <Header />
          <div className='centre_row'>
          <SidebarLeft />
            <Switch>
              <Route exact path='/ReadMine' component={ReadMine} />
              <Route exact path='/' component={Home}/>
              <Route exact path='/NewMine' component={NewMine} />
            </Switch>
          <SidebarRight />
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    </DataProvider>  
  )
}

export default App;
