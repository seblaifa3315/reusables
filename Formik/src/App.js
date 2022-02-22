import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import FormikContainer from'./components/FormWithFormik/FormikContainer';
import MaterialUIFormik from './components/materialUiFormik/MaterialUIFormik';

function App() {
  return (
    <BrowserRouter>
    <Link to='/'>
      <button>Home</button>
    </Link>
    <Link to='react-datepicker'>
    <button>react Datepicker</button>
    </Link>
    <Link to='materialui-formik'>
    <button>materialUi Formik</button>
    </Link>
    <Routes>
      <Route path='/react-datepicker' element={<FormikContainer />} />
      <Route path='/materialui-formik' element={<MaterialUIFormik />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
