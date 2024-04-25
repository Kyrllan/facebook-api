import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/login", "Auth/Main.store");
  Route.delete("/logout", "Auth/Main.destroy").middleware("auth");
}).prefix("auth");
