import "./NewUser.css";

const NewUser = () => {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserFormItem">
          <label>Username</label>
          <input type="text" placeholder="John" className="newUserFormInput" />
        </div>
        <div className="newUserFormItem">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="John Smith"
            className="newUserFormInput"
          />
        </div>
        <div className="newUserFormItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@gmail.com"
            className="newUserFormInput"
          />
        </div>
        <div className="newUserFormItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            className="newUserFormInput"
          />
        </div>
        <div className="newUserFormItem">
          <label>Phone</label>
          <input
            type="text"
            placeholder="+1 123 456 67"
            className="newUserFormInput"
          />
        </div>
        <div className="newUserFormItem">
          <label>Address</label>
          <input
            type="text"
            placeholder="New York | USA"
            className="newUserFormInput"
          />
        </div>
        <div className="newUserFormItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" />
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUserFormItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserCreate">Create</button>
      </form>
    </div>
  );
};

export default NewUser;
