import { Droppable } from 'react-beautiful-dnd'
import { ListItem } from './ListItem'
import React, { useState } from 'react'
import styled from 'styled-components'

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
`

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
`

const AddButton = styled.button`
  height: 40px;
  width: 40px;
  color: black;
  background: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`

// const generateItem = () => {
//   const randomId = Math.floor(Math.random() * 1000)
//   return {
//     id: `item-${randomId}`,
//     prefix: 'Lunes',
//     content: `item ${randomId}`
//   }
// }

export const DraggableElement = ({ prefix, elements, listKey, setElements }) => {
  const [elementsList, setElementsList] = useState(elements)

  const handleAdd = () => {
    setElementsList([...elementsList, {
      id: 'item-13123',
      prefix: 'Lunes',
      content: 'item'
    }])
  }

  return (
    <DroppableStyles>
      <ColumnHeader>{prefix}</ColumnHeader>
      <Droppable droppableId={`${prefix}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elementsList.map((item, index) => (
              <ListItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <AddButton onClick={handleAdd}>
        +
      </AddButton>
    </DroppableStyles>
  )
}
