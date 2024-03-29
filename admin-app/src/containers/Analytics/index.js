import React from "react";
import { Layout } from "../../components/Layout";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import LChart from "../../components/chart/Chart";
import { Dropdown, Button } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentMonth,
  getDateByMonthYear,
  getNewUser,
  getTicketCanceled,
} from "../../actions/analyticsActions";
import "../../asset/css/containers-css/Analytics.css";
import Chart from "react-apexcharts";
import { useHistory } from "react-router";
import { Doughnut } from "react-chartjs-2";
import { ReportEnterpriseTable } from "../../components/table/ReportEnterpriseTable";

/**
 * @author
 * @function Analytics
 **/

export const Analytics = (props) => {
  var today = new Date();

  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  var monthIndex = month - 1;

  var date = new Date(year, monthIndex, 1);

  var names = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  var days = [];
  while (date.getMonth() === monthIndex) {
    days.push(date.getDate() + "-" + names[date.getDay()]);
    //days.push(date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear());
    date.setDate(date.getDate() + 1);
  }

  //console.log(days);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentMonth({ month, year }));
    dispatch(getDateByMonthYear({ month, year }));
    dispatch(getNewUser({ month, year }));
    dispatch(getTicketCanceled({ month, year }));
  }, [month, year]);

  const filterShow = (e) => {
    e.preventDefault();
    dispatch(getDateByMonthYear({ month, year }));
    dispatch(getCurrentMonth({ month, year }));
    dispatch(getNewUser({ month, year }));
    dispatch(getTicketCanceled({ month, year }));
  };

  const analytics = useSelector((state) => state.analytics);
  const { totalTicket, totalSale, totalCanceledTicket, totalNewUser } =
    analytics;

  const chart = useSelector((state) => state.chart);
  const { listTicket, listSale } = chart;

  const newUser = useSelector((state) => state.newUser);
  const { listNewUser } = newUser;

  const ticket = useSelector((state) => state.ticket);
  const { donutData } = ticket;

  const chartOptions = {
    series: [
      {
        type: "column",
        name: "Vé bán",
        data: listTicket,
      },
      {
        type: "line",
        name: "Doanh thu",
        data: listSale,
      },
    ],

    options: {
      color: ["#6ab04c", "#2980b9"],
      chart: {
        background: "transparent",
      },
      dataLabels: {
        enable: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: days,
      },
      legent: {
        position: "left",
      },
      grid: {
        show: true,
      },
      yaxis: [
        {
          title: {
            text: "Vé bán",
          },
        },
        {
          opposite: true,
          title: {
            text: "Doanh thu",
          },
        },
      ],
      title: {
        text: "Thống kê vé bán và doanh thu",
        align: "left",
      },
    },
  };

  const chartOptions1 = {
    series: [
      {
        type: "line",
        name: "Người dùng mới",
        data: listNewUser,
      },
    ],

    options: {
      color: ["#6ab04c", "#2980b9"],
      chart: {
        background: "transparent",
      },
      dataLabels: {
        enable: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: days,
      },
      legent: {
        position: "left",
      },
      grid: {
        show: true,
      },
      title: {
        text: "Thống kê người dùng mới",
        align: "left",
      },
      markers: {
        hover: {
          sizeOffset: 4,
        },
      },
    },
  };

  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Layout sidebar>
      <div>
        <FeaturedInfo
          ticket={totalTicket}
          sale={totalSale}
          canceledTicket={totalCanceledTicket}
          newUser={totalNewUser}
        />
        <div className="dropDown ticket-analytics">
          <select
            value={month}
            classname="custom-select"
            onChange={(e) => {
              setMonth(parseInt(e.target.value));
            }}
          >
            <option value="1">Tháng 1</option>
            <option value="2">Tháng 2</option>
            <option value="3">Tháng 3</option>
            <option value="4">Tháng 4</option>
            <option value="5">Tháng 5</option>
            <option value="6">Tháng 6</option>
            <option value="7">Tháng 7</option>
            <option value="8">Tháng 8</option>
            <option value="9">Tháng 9</option>
            <option value="10">Tháng 10</option>
            <option value="11">Tháng 11</option>
            <option value="12">Tháng 12</option>
          </select>
          <select
            value={year}
            classname="custom-select"
            onChange={(e) => {
              setYear(parseInt(e.target.value));
            }}
          >
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
          {/* <Button variant="dark" onClick={filterShow} className="btnItem">
            Filter
          </Button> */}
        </div>

        <div className="col-12">
          <div className="chart">
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
            />
          </div>
        </div>

        {/* <div className="chart">
        <div className="chart">
          <Chart options={chartOptions.options} series={chartOptions.series} />
        </div>
        {/* <div className="chart">
                    <Chart
                        type="donut"
                        width={600}
                        height={600}
                        series={donutData}
                        options={{
                            labels: ['Ticket Sold', 'Ticket Canceled'],
                            title: { text: 'Ticket' },
                            plotOptions: {
                                pie: {
                                    donut: {
                                        labels: {
                                            show: true
                                        }
                                    }
                                }
                            }
                        }}
                    >
                    </Chart>
                </div> */}
        <div className="row">
          <div className="col-8">
            <div className="chart">
              <Chart
                options={chartOptions1.options}
                series={chartOptions1.series}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="chart">
              <b> Thống kê vé </b>
              <Doughnut
                data={{
                  labels: ["Vé bán", "Vé hủy"],
                  datasets: [
                    {
                      data: donutData,
                      backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                      ],
                    },
                  ],
                }}
              ></Doughnut>
            </div>
          </div>
        </div>
        <ReportEnterpriseTable
          month={month}
          year={year}
        ></ReportEnterpriseTable>

        {/* <LChart data={listTicket} title="Tickets" grid dataKey1="totalTicket" />
                <LChart data={listTicket} title="Sales" grid dataKey2="totalSale" />
                <LChart data={listOfNewUser} title="New User" grid dataKey3="newUser" />
                <Chart
                    type="donut"
                    width={600}
                    height={600}
                    series={[ticketCurrentMonth, ticketCanceled]}
                    options={{
                        labels: ['Ticket Sold', 'Ticket Canceled'],
                        title: { text: 'Ticket' },
                        plotOptions: {
                            pie: {
                                donut: {
                                    labels: {
                                        show: true
                                    }
                                }
                            }
                        }
                    }}
                >

                </Chart> */}
      </div>
    </Layout>
  );
};
