import SnakeHead from "../components/snake_game/SnakeHead";
import Matter from "matter-js";

export default restart => {
  let engine = Matter.Engine.create({enableSleeping:false})
  let world = engine.world
  world.gravity.y = 0.4;

  return {snakeHead: SnakeHead(world, 'green', {x:50, y:200}, {height:40, width:40})};
}
