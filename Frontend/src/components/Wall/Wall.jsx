import "./Wall.scss";

function Wall({ wall }) {
  return (
    <div
      className="wall"
      style={{
        left: `${wall.x}px`,
        top: `${wall.y}px`,
        width: `${wall.width}px`,
        height: `${wall.height}px`
      }}
    />
  );
}

export default Wall;