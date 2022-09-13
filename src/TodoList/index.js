import React from "react";
import "./TodoList.css";

function TodoList(props) {
  const redenrFunc = props.children || props.render;
  return (
    <section className="TodoLList-container">
      {props.error && props.onError()}
      {props.loading && props.onLoading()}
      {!props.loading && !props.totalTodos && props.onEmptyTodos()}
      {!!props.totalTodos &&
        !props.searchedTodos?.length &&
        props.onEmptySearchResults(props.searchValue)}
      {!props.loading && !props.error && props.searchedTodos.map(redenrFunc)}
    </section>
  );
}

export { TodoList };
