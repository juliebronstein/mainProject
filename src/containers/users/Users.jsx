import React from 'react';
import AddUser from './AddUser';
import { UserTable } from './UserTable';

const Users = () => {
    return (
        <div id="manage_user_section" className="manage_user_section main_section">
            <h4 className="text-center my-3">مدیریت کاربران</h4>
            <div className="row justify-content-between">
               
              <UserTable/>
            </div>
      
        </div>
    );
}

export default Users;
