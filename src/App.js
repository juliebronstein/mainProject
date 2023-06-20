import { useLocation } from "react-router-dom";
import { Index as AdminLayout } from "./layouts/admin/Index";
import { Apex } from "./layouts/admin/utils/Apex";
import { AuthLayout } from "./layouts/auth/AuthLayout";
import { Provider } from "react-redux";
import store from "./containers/redux/store";

function App() {
  const location = useLocation();
  //  const labels = ['فروردین' , 'اردیبهشت', 'خرداد' , 'تیر' , 'مرداد' , 'شهریور' , 'مهر' , 'آبان' , 'آذر' ,
  //   'دی' , 'بهمن' , 'اسفند'];
  //  const datapoints = [0, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170];
  return (
    <Provider store={store}>
    <div className="app">
      {location.pathname.includes("/auth") ? <AuthLayout /> : <AdminLayout />}

      {/* <Apex labels={labels} datapoints={datapoints} /> */}
    </div>
    </Provider>
  );
}

export default App;
