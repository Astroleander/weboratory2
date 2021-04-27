import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from '../../../index.modules.less';
import { CaseBox, Sandbox, SourceBoxForFunc } from '@/lab-framework/sandbox_components';

import { deepClone } from './deep_clone';

const test = ([output, setOutput]) => {
  class Person {
    name: String | undefined;
    address: Address | undefined;
    constructor(name, address) {
      this.name = name; this.address = address;
    }
  }
  class Address {
    country: String = 'PX';
    location: Array<String>;
    constructor(location, country?) {
      this.location = location;
      this.country = country
    }
  }
  let p1 = new Address(['No.2', 'ST. PIPI', 'Tokyo']);
  let p2 = new Address(['No.10', 'Rd. XTC', 'Beijing']);
  let bob = new Person('Bob', p1);
  
  let alice = deepClone(bob) as Person;
  alice.name = 'alice';
  alice.address = p2;
  setOutput(v => v.concat(JSON.stringify(bob)));

  let ciri = bob;
  ciri.name = 'Ciri';
  ciri.address = p2;
  setOutput(v => v.concat(JSON.stringify(bob)));
}

const Index = () => {
  return (
    <>
      <h1>Deep Clone</h1>
      <SourceBoxForFunc source={deepClone}></SourceBoxForFunc>
      <CaseBox testCase={test}></CaseBox>
    </>
  )
}

export default Sandbox.instanceFactory({ reactNode: Index});
