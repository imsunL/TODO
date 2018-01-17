var filters={
	all:function(todos){
		return todos;
	}
	active:function(todos){
		return todos.filter(function(todo){
		return !todos.completed;	
		});		
	},
	completed:function(todos){
		return todos.filter(function(todo){
		return todo.completed;	
		});		
	},
};
new Vue({
	el:'.todoapp',
	data:{
		newTodo:'',
		visibility:'all',
		editedTodo=null,
	},
	computed{
		filteredTodos:function(){
			return filters [this.visibility](this.todos);
		},
		
	},
	methods:{
		addTodo:function(){
			var value = this.newTodo&&this.newTodo.trim();
			if (!value) {
				return;
			}
			this.todos.pash({title:value,completed:false});
			this.newTodo='';
		},
		removeTodo:function(todo){
			this.todos.$remove(todo);
		},
		editTodo:function(todo){
			this.beforeEditCatch = todo.title;
			this.editedTodo = todo;
		},
		doneEdit:function(todo){
			if (!this.editTodo) {
				return;
			}
			this.editedTodo=null;
			todo.title=todo.title.trim();
			if (!todo.title) {
				this.removeTodo(todo);
			}
		},
		cancelEdit: function (todo) {
            this.editedTodo = null;
            todo.title = this.beforeEditCache;
        },
        removeCompleted: function () {
            this.todos = filters.active(this.todos);
        }
	},
	directives: {
        'todo-focus': function (value) {
            if (!value) {
                return;
            }
            var el = this.el;
            Vue.nextTick(function () {
            el.focus();
            });
        }
    }
})