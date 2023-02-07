import Chart from "../../components/Chart/Chart";
// import FeaturedInfo from "../../components/FeaturedInfo/FeaturedInfo";
import "./Home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/WidgetSm/WidgetSm";
import WidgetLg from "../../components/WidgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../redux/apiCalls";

const Home = () => {
  const [userStats, setUserStats] = useState([]);
  const adminUser = useSelector((state) => state.adminUser.currentUser);
  let dispatch = useDispatch();

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(
          "https://ecommerce-backend-tf4t.onrender.com/api/users/stats",
          {
            headers: {
              token: "Bearer " + adminUser.accessToken,
            },
          }
        );

        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (err) {
        if (err.response.status === 403) {
          Logout(dispatch);
        }
      }
    };
    getStats();
  }, [MONTHS, adminUser, dispatch]);

  console.log(userStats);

  return (
    <div className="home">
      {/* <FeaturedInfo /> */}
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default Home;
