
import PgPricipal from './PgPricipal'
import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonDemo() {
 
  return (
    <Button  onClick={() =>{
       window.location.href = '/Instrutor'
    }}  variant="contained">
      Link
    </Button>
  );
}
