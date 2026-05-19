import "./Table.scss";

function Table({ table }) {
  return (
    <div
      className={`Table ${table.state}`}
      style={{
        left: `${table.x}px`,
        top: `${table.y}px`
      }}
    >
      {table.id}
    </div>
  );
}

export default Table;