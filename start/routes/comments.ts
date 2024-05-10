import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/", "Comments/Main.store").middleware("auth");
  Route.put("/:id", "Comments/Main.update").middleware("auth");
  Route.delete("/:id", "Comments/Main.destroy").middleware("auth");
}).prefix("comments");
