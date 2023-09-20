import React from 'react';
import { Fragment } from 'react';

import Navbar from '../../components/navBar/navBar';
import DogArea from '../../components/dogArea/dogArea';

import style from "./home.module.css";

function Home() {
return (
  <Fragment>
    <div className={style.home}>
      <Navbar/>
      <DogArea/>
    </div>
  </Fragment>
  );
}

export default Home;