import React, { useState } from 'react';
import AdForm from '../components/form/AdForm';
import Nav from '../components/menu/Nav';
import Footer from '../components/footer/Footer';

function Form({ title, type, updating, category }) {

  return (
    <>
      <AdForm title={title} type={type} isUpdating={updating} category={category}/>
    </>
  );
}

export default Form;