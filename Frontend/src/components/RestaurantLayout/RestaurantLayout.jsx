import "./RestaurantLayout.scss";

import Table from "../Table/Table";
import Wall from "../Wall/Wall";

function RestaurantLayout() {

  const tables = [
    {
      id: 1,
      x: 180,
      y: 720,
      state: "libre"
    },
    {
      id: 2,
      x: 850,
      y: 720,
      state: "pendiente"
    },
    {
      id: 3,
      x: 500,
      y: 120,
      state: "ocupada"
    }
  ];

  const walls = [
    //arriba
    {
      id: 1,
      x: 0,
      y: 0,
      width: 1200,
      height: 15
    },
    //izquierda
    {
      id: 2,
      x: 0,
      y: 0,
      width: 15,
      height: 700
    },

    //derecha
    {
      id: 3,
      x: 1085,
      y: 0,
      width: 15,
      height: 700
    },

    //abajo-izquierda
    {
      id: 4,
      x: 0,
      y: 690,
      width: 450,
      height: 15
    },

    //abajo-derecha
    {
      id: 5,
      x: 650,
      y: 690,
      width: 450,
      height: 15
    },

    //pared-entrada
    {
      id: 5,
      x: 412.5,
      y: 590,
      width: 275,
      height: 15
    },

    //barra-derecha
    {
      id: 6,
      x: 170,
      y: 80,
      width: 15,
      height: 210
    },
    //barra-abajo
    {
      id: 7,
      x: 0,
      y: 275,
      width: 185,
      height: 15
    },
  ];

  return (
    <div className="salon">

      {walls.map((wall) => (
        <Wall
          key={wall.id}
          wall={wall}
        />
      ))}

      {tables.map((table) => (
        <Table
          key={table.id}
          table={table}
        />
      ))}

    </div>
  );
}

export default RestaurantLayout;