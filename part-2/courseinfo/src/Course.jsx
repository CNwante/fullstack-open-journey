const Course = ({ course }) => {

  return (
     <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ course }) => {
  return (
    <div>
      <Part
        part={course.parts[0].name}
        exercises={course.parts[0].exercises}
      />
      <Part
        part={course.parts[1].name}
        exercises={course.parts[1].exercises}
      />
      <Part
        part={course.parts[2].name}
        exercises={course.parts[2].exercises}
      />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

export default Course
