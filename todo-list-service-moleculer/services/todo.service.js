const { ServiceBroker } = require("moleculer");
const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const Todo = require("../models/todo.model");

const CONNECT_DB_STRING = "mongodb://localhost/todo_app_moleculer";

module.exports = {
	name: "tasks",
	mixins: [DbService],
	adapter: new MongooseAdapter(process.env.MONGO_URI || CONNECT_DB_STRING),
	model: Todo,
	actions: {
		// Определение CRUD операций
		create: {
			params: {
				description: "string",
				isCompleted: { type: "boolean", optional: true },
			},
			async handler(ctx) {
				return this.adapter.insert(ctx.params);
			}
		},
		list: {
			async handler() {
				return this.adapter.find({});
			}
		},
		update: {
			params: {
				id: "string",
				description: { type: "string", optional: true },
				isCompleted: { type: "boolean", optional: true },
			},
			async handler(ctx) {
				const { id, ...updateData } = ctx.params;
				return this.adapter.updateById(id, { $set: updateData });
			}
		},
		remove: {
			params: {
				id: "string"
			},
			async handler(ctx) {
				console.log("remove params");
				console.log(ctx.params);
				return this.adapter.removeMany({ _id: ctx.params.id });
			}
		}
	}
};
