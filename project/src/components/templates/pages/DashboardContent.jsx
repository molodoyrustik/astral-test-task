import React from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';

const DashboardContent = (props) => {
  const { lists } = props;
  const labels = [];
  const sums = [];
  lists.forEach((list) => {
    labels.push(list.listTitle);
    let sum = 0;
    list.todos.forEach((todo) => {
      sum += todo.price;
    });
    sums.push(sum);
  });

  const data = {
    labels,
    datasets: [
      {
        data: [...sums],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="dashboard-content">
      <div className='dashboard-content__schedule'>
        <h2 className='dashboard-content__title'>Expense schedule</h2>
        <Pie data={data} height={500} width={500} />
      </div>
    </div>
  );
};

export default connect((state) => {
  return {
    lists: state.user.lists,
  };
}, {})(DashboardContent);
