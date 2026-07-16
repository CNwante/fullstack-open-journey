# Part 0 Reflection

## Key Concepts Learned

- HTTP Request/Response Cycle
- Traditional Web Applications
- Single Page Applications (SPAs)
- Basics of Browser Developer Tools

## Challenges

Understanding the flow of the Single Page Application (SPA) version of the Notes app was initially confusing, especially how the browser updates the page without performing a full page reload. Creating the sequence diagrams helped me visualize and better understand the interactions between the browser and the server.

## Key Takeaways (Engineering Principles)

- **Systems Thinking:** I learned to break a single user action into multiple interacting components and understand how they work together as a system.
- **Separation of Concerns:** Each component has a specific responsibility.

| Component  | Responsibility                                    |
| ---------- | ------------------------------------------------- |
| Browser    | Displays the user interface and sends requests    |
| Server     | Processes requests and returns responses          |
| JavaScript | Controls browser behavior and updates the DOM     |
| CSS        | Controls the presentation of the application      |
| HTML       | Defines the structure of the web page             |
| JSON       | Transfers data between the server and the browser |

- **System Modeling and Data Flow:** I learned how to model a system and understand how data flows between different components, from the browser to the server and back.

## Resources Used

- Mermaid for creating sequence diagrams
- MDN Web Docs for web concepts and documentation
- ChatGPT for validating my understanding and correcting Mermaid diagram syntax
