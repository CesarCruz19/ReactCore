import React, { useEffect } from "react";
import { MainLayout } from "pages";
import { Table } from "components";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Status } from "common/constants";
import { useHistory } from "react-router-dom";
import Routes from "routes";

export default () => {
  const history = useHistory();
  const getUsers = useStoreActions((actions) => actions.users.getData);
  const { users = [], status } = useStoreState((state) => ({
    users: state.users.list,
    status: state.users.status,
  }));

  useEffect(() => {
    getUsers();
  }, []);

  const isLoading = status === Status.FETCHING;

  const actions = [
    { text: "Add", icon: "plus", handler: () => alert("Header Action") },
  ];

  const columns = [
    { dataIndex: "email", title: "Email", type: "link" },
    { dataIndex: "first_name", title: "Firstname" },
    { dataIndex: "last_name", title: "Last Name" },
    { dataIndex: "avatar", title: "Photo", type: "image" },
    {
      title: "Action",
      type: "action",
      actions: [
        {
          icon: "form",
          handler: (record) => history.push(`${Routes.USERS}/${record.id}`),
        },
      ],
    },
  ];

  return (
    <MainLayout loading={isLoading} title="Home" actions={actions}>
      <Table columns={columns} data={users} />
    </MainLayout>
  );
};
