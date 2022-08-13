import React, { Component } from "react";
import styled from "styled-components";
import css from "../App.css";
import trash from "../Images/Trash Icon.png";
import edit from "../Images/Edit Icon.png";
import { isContentEditable } from "@testing-library/user-event/dist/utils";
import { toBeInTheDocument } from "@testing-library/jest-dom/dist/matchers";

const Container = styled.div`
  max-width: 1920px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-image: linear-gradient(
    to right bottom,
    #5a616b,
    #47484f,
    #333035,
    #1e1b1d,
    #000000
  );
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const ContainerTitle = styled.article`
  width: 100%;
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 2.5rem;
    font-style: italic;
    color: #fff;
  }
`;

const ContainerTask = styled.div`
  width: 50%;
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  width: 30vw;
  border-radius: 10px;
  border: none;
  background: none;
  background-color: rgba(255, 255, 255, 0.9);
`;

const Button = styled.button`
  padding: 9px;
  width: 8vw;
  border-radius: 15px;
  font-size: 14px;
  border: none;
  color: #fff;
  cursor: pointer;
  background-image: linear-gradient(
    to right,
    #000000,
    #1b0811,
    #280e20,
    #351132,
    #3c1748
  );
`;

const Tasks = styled.div`
  width: 50%;
  height: calc(100vh - 30vh);
`;

const TaskBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 90%;
`;

const TaskUl = styled.ul`
  padding: 10px;
  width: 75%;
  border-radius: 10px;
  border: none;
  background: none;
  background-color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const TaskLi = styled.li`
  list-style: none;
  height: 100%;
  width: 85%;
  margin-left: 10px;
`;

const ContainerButtons = styled.div`
  height: 100%;
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const ButtonsTask = styled.button`
  border: none;
  background: none;
`;

const Images = styled.img`
  width: 20px;
  height: 100%;
  cursor: pointer;
`;

const Checkbox = styled.input`
  cursor: pointer;
`;

export default class Main extends Component {
  state = {
    task: "",
    taskList: [],
  };

  handleChange = (e) => {
    this.setState({
      task: e.target.value,
    });
  };

  submitSend = () => {
    this.setState({
      taskList: this.state.taskList.concat({
        task: this.state.task,
        id: Date.now(),
      }),
      task: "",
    });
  };

  removeTask = (id) => {
    this.setState({
      taskList: this.state.taskList.filter((item) => item.id !== id),
    });
  };

  render() {
    return (
      <>
        <Container>
          <ContainerTitle>
            <h1>To Do List</h1>
          </ContainerTitle>
          <ContainerTask>
            <Input
              type="text"
              placeholder="Type your task here"
              value={this.state.task}
              onChange={this.handleChange}
            />
            <Button onClick={this.submitSend}>Submit</Button>
          </ContainerTask>
          <Tasks>
            {this.state.taskList.map((item, index) => (
              <TaskBody>
                <TaskUl index={index}>
                  <Checkbox type="checkbox" />
                  <TaskLi>{item.task}</TaskLi>
                  <ContainerButtons>
                    <ButtonsTask>
                      <Images src={edit} alt="Edit Icon" />
                    </ButtonsTask>
                    <ButtonsTask
                      onClick={() => {
                        this.removeTask(item.id);
                      }}
                    >
                      <Images src={trash} alt="Trash Icon" />
                    </ButtonsTask>
                  </ContainerButtons>
                </TaskUl>
              </TaskBody>
            ))}
          </Tasks>
        </Container>
      </>
    );
  }
}
