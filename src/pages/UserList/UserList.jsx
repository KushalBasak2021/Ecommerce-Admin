import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./UserList.css";
import { useEffect } from "react";
import { deleteUser, getUsers } from "../../redux/apiCalls";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img src={params.row.img} alt="" className="productListImg" /> */}
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "isAdmin",
      headerName: "isAdmin",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link> */}
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="productList">
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default UserList;
