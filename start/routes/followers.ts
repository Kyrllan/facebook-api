import Route from "@ioc:Adonis/Core/Route";

Route.get("/followers", "Followers/Main.index").middleware("auth");
