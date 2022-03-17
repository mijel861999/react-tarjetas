import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { DragDropContext } from 'react-beautiful-dnd'
import { DraggableElement } from './DraggableElement'

const DragDropContextContainer = styled.div`
  padding: 20px;
  border: 4px solid indianred;
  border-radius: 6px;
`

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
`

// fake data generator
const getItems = (count, prefix) =>
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const randomId = Math.floor(Math.random() * 1000)
    return {
      id: `item-${randomId}`,
      prefix,
      content: `item ${randomId}`
    }
  })

const removeFromList = (list, index) => {
  const result = Array.from(list)
  const [removed] = result.splice(index, 1)
  return [removed, result]
}

const addToList = (list, index, element) => {
  const result = Array.from(list)
  result.splice(index, 0, element)
  return result
}

const lists = ['Lunes', 'Martes']

const generateLists = () =>
  lists.reduce(
    (acc, listKey) => ({ ...acc, [listKey]: getItems(2, listKey) }),
    {}
  )

export const DragList = () => {
  const [elements, setElements] = useState(generateLists())

  useEffect(() => {
    setElements(generateLists())
  }, [])

  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }
    const listCopy = { ...elements }

    const sourceList = listCopy[result.source.droppableId]
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    )

    listCopy[result.source.droppableId] = newSourceList
    const destinationList = listCopy[result.destination.droppableId]
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    )

    setElements(listCopy)
  }

  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {lists.map((listKey) => (
            <DraggableElement
              elements={elements[listKey]}
              listKey={listKey}
              setElements={setElements}
              key={listKey}
              prefix={listKey}
            />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  )
}
