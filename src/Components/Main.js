import React, { Component } from "react";
import styled from "styled-components";
import css from "../App.css";
import trash from "../Images/Trash Icon.png";
import edit from "../Images/Edit Icon.png";

const Container = styled.div`
  max-width: 1920px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
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
    font-size: 1.5rem;
    color: #fff;
  }
`;

const ContainerTask = styled.div`
  width: 50%;
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  padding: 10px;
  outline: none;
  width: 30vw;
  border-radius: 5px;
  border: none;
  background: none;
  background-color: rgba(255, 255, 255, 0.9);
`;

const Button = styled.button`
  padding: 10px;
  width: 8vw;
  border-radius: 5px;
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
  text-decoration: line-through;
  text-decoration: none;
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

const EditTaskBody = styled.div`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;
`;

const EditTaskMain = styled.div`
  width: 550px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0);
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  h2 {
    border: none;
    width: 80%;
    font-size: 20px;
    color: #fff;
  }

  input {
    width: 80%;
    padding: 10px;
    background: none;
    border: solid 2px rgb(65, 83, 151);
    border-radius: 8px;
    color: #fff;
  }
`;

const EditTaskButton = styled.button`
  width: 80%;
  background: none;
  border: none;
  display: flex;
  justify-content: flex-end;
  gap: 20px;

  button {
    border: none;
    background: none;
    color: rgb(65, 83, 151);
    font-size: 17px;
    font-weight: 600;
    cursor: pointer;
  }
`;

export default class Main extends Component {
  state = {
    task: "",
    taskList: [],
    editTask: "",
    posicao: 0,
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
    console.log("Adicionando", this.state.taskList);
  };

  removeTask = (id) => {
    this.setState({
      taskList: this.state.taskList.filter((item) => item.id !== id),
    });
    console.log("Removendo", this.state.taskList);
  };

  showDisplay = (task, posicao) => {
    const btn = document.querySelector(".Container-box");
    if (btn.style.display === "none") {
      this.setState({
        editTask: task,
        posicao: posicao,
      });
      btn.style.display = "flex";
    } else {
      btn.style.display = "none";
    }
  };

  newtextValue = (e) => {
    this.setState({
      editTask: e.target.value,
    });
    console.log("Mensagem escrita", this.state.editTask);
  };

  newvalueTest = () => {
    const array = [...this.state.taskList];
    array.splice(this.state.posicao, 1, {
      task: this.state.editTask,
      id: this.state.taskList[this.state.posicao].id,
    });
    this.setState({
      taskList: array,
    });
    this.showDisplay();
    console.log("Posicao", this.state.posicao);
    console.log(this.state.taskList);
    console.log(this.state.editTask);
  };

  checkInput = () => {
    const input = document.querySelector(".inputBox");
    const typing = document.querySelector(".checkMark");

    if (input === toBeChecked || typing.style.textDecoration === "none") {
      typing.style.textDecoration = "lineThrough";
    }
    console.log(input);
    console.log(typing);
  };

  render() {
    return (
      <>
        <Container>
          <ContainerTitle>
            <h1>To Do List</h1>
          </ContainerTitle>

          <ContainerTask>
            <form onSubmit={(e) => e.preventDefault()}>
              <Input
                type="text"
                placeholder="Type your task here"
                value={this.state.task}
                onChange={this.handleChange}
              />
              <Button onClick={this.submitSend}>Submit</Button>
            </form>
          </ContainerTask>

          <Tasks>
            {this.state.taskList.map((item, index) => (
              <TaskBody>
                <TaskUl index={index}>
                  <Checkbox
                    className="inputBox"
                    type="checkbox"
                    onClick={this.checkInput}
                  />
                  <TaskLi className="checkMark">{item.task}</TaskLi>
                  <ContainerButtons>
                    <ButtonsTask
                      onClick={() => {
                        this.showDisplay(item.task, index);
                      }}
                    >
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
          <EditTaskBody className="Container-box">
            <EditTaskMain className="MainBox">
              <h2>Edit Task</h2>
              <input
                onChange={this.newtextValue}
                value={this.state.editTask}
                type="text"
              />
              <EditTaskButton>
                <button onClick={this.showDisplay}>CANCELAR</button>
                <button onClick={this.newvalueTest}>OK</button>
              </EditTaskButton>
            </EditTaskMain>
          </EditTaskBody>
        </Container>
      </>
    );
  }
}
