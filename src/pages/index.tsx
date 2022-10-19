import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home: NextPage = () => {
  return (
    <div style={{ textAlign: 'center', fontSize: '28px', marginTop: '15px' }}>
      This app is created with Next.js and Mongo Atlas. Please click on
      &quot;Todo&quot; link to see how it works.
    </div>
  );
};

export default Home;
