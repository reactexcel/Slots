import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Modal from "../Components/Modal";
import {
  ApolloClient,
  InMemoryCache,
  gql,
  useQuery,
  useMutation,
} from "@apollo/client";

const uri = `http://localhost:4000/graphql`;

const query = gql`
  query Query($getPointsId: ID!) {
    getPoints(id: $getPointsId) {
      points
      attempts
    }
  }
`;

const AlterPointsMutation = gql`
  mutation AlterPointsMutation(
    $point: Int!
    $attempts: Int!
    $alterPointsId: ID!
  ) {
    alterPoints(point: $point, attempts: $attempts, id: $alterPointsId) {
      points
      attempts
    }
  }
`;

const client = new ApolloClient({
  uri: `${uri}`,
  cache: new InMemoryCache(),
});

const Dashboard = () => {
  const { loading, error, data } = useQuery(query, {
    variables: { getPointsId: localStorage.getItem("id") },
  });
  const [alterPoints] = useMutation(AlterPointsMutation);
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(false);
  const [points, setPoints] = useState(0);
  const [attempts, setAttempts] = useState(50);
  const [start, setStart] = useState(false);
  const [slots, setSlots] = useState({
    slot1: 0,
    slot2: 0,
    slot3: 0,
  });

  useEffect(() => {
    if (data && data.getPoints) {
      setAttempts(data.getPoints.attempts);
      setPoints(data.getPoints.points);
    }
  }, [data]);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [show]);

  const randomize = () => {
    return Math.floor(Math.random() * 9);
  };

  const handleAlterPoints = (points, attempts) => {
    console.log(data?.getPoints, "____________");
    console.log(points, attempts, "____________");
    alterPoints({
      variables: {
        point: points,
        attempts: attempts,
        alterPointsId: localStorage.getItem("id"),
      },
    }).then((response) => {
      console.log(response?.data?.alterPoints, "asdfghjkl_________");
      if (response?.data?.alterPoints) {
        setPoints(response?.data?.alterPoints?.points);
        setAttempts(response?.data?.alterPoints?.attempts);
      }
    });
  };

  const handleGame = () => {
    if (attempts) {
      setAttempts((attempts) => attempts - 1);
      setSlots({
        slot1: 0,
        slot2: 0,
        slot3: 0,
      });
      setStart(true);
      let s1 = randomize();
      let s2 = randomize();
      let s3 = randomize();
      setTimeout(() => {
        setStart(false);
        setSlots({
          ...slots,
          slot1: s1,
          slot2: s2,
          slot3: s3,
        });
        if (s1 === s2 && s2 === s3 && s3 === s1) {
          handleAlterPoints(points + 500, attempts - 1);
          setMessage("Congratulations!!! You have won 500 Points");
          setShow(true);
        } else if (s1 === s2 - 1 && s2 === s3 - 1) {
          handleAlterPoints(points + 300, attempts - 1);
          setMessage("Congratulations!!! You have won 300 Points");
          setShow(true);
        } else if (s1 === s2 - 2 && s2 === s3 - 2) {
          handleAlterPoints(points + 200, attempts - 1);
          setMessage("Congratulations!!! You have won 200 Points");
          setShow(true);
        } else if (s1 === 1 && s2 === 5 && s3 === 9) {
          handleAlterPoints(points + 50, attempts - 1);
          setMessage("Congratulations!!! You have won 50 Points");
          setShow(true);
        } else {
          handleAlterPoints(points + 5, attempts - 1);
          setMessage("Congratulations!!! You have won 5 Points");
          setShow(true);
        }
      }, 3000);
    } else {
      setMessage(
        "You have exhausted your attempts. Please enter a coupon code to continue"
      );
      setShow(true);
    }
  };

  const handleClaim = () => {
    setMessage("Congratulations!!! You have claimed your points");
    setShow(true);
    setPoints((points) => points - 1000);
  };

  if (loading)
    return (
      <div className="h-screen bg-gradient-to-b from-gray-900 via-gray-500 to-white text-center">
        <p className="text-6xl animate-spin text-white">o</p>
      </div>
    );
  return (
    <div className="h-full bg-gradient-to-b from-gray-900 via-gray-500 to-white text-center">
      <Modal show={show} setShow={setShow} message={message} />
      <div className="grid md:grid-cols-3 grid-cols-1">
        <p className="bg-gray-300 text-black px-12 py-6 m-12 text-4xl rounded flex justify-between">
          Prize Points: {points}
          {points > 1000 && (
            <button
              onClick={handleClaim}
              className="rounded-xl text-sm bg-gray-900 text-white p-2 transition duration-500 transform hover:bg-white hover:text-gray-900"
            >
              Claim
            </button>
          )}
        </p>
        <p className="bg-gray-300 text-black px-12 py-6 m-12 text-4xl rounded">
          Attempts: {attempts}
        </p>
        <button
          onClick={() => history.push("/login")}
          className="bg-gray-300 text-black px-12 py-6 m-12 text-4xl rounded transition duration-500 transform hover:bg-gray-700 hover:text-white"
        >
          Logout
        </button>
      </div>
      <div>
        <p className="mx-4 md:mx-96 rounded-2xl py-12 bg-gray-900 bg-opacity-60 text-6xl text-white text-center font-extrabold">
          Welcome to the Slot Game Site.
        </p>
        <div className="grid md:grid-cols-3 grid-cols-1 mx-auto">
          <div className="bg-gray-300 text-black px-12 py-6 m-12 text-4xl rounded">
            <p className={start ? "animate-ping" : ""}>{slots.slot1}</p>
          </div>
          <div className="bg-gray-300 text-black px-12 py-6 m-12 text-4xl rounded">
            <p className={start ? "animate-ping" : ""}>{slots.slot2}</p>
          </div>
          <div className="bg-gray-300 text-black px-12 py-6 m-12 text-4xl rounded">
            <p className={start ? "animate-ping" : ""}>{slots.slot3}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleGame}
            className="bg-gray-300 text-black px-12 py-6 m-12 text-4xl rounded transition duration-500 transform hover:bg-gray-700 hover:text-white"
            disabled={start}
          >
            {!start ? "Play" : "Please wait"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
