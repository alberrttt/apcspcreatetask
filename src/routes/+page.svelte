<script lang="ts">
	import { bind } from "svelte/internal";
	import {
		Priority,
		priority_to_string,
		string_to_priority,
		type Task,
	} from "../utility";

	let tasks = new Array<Task>();
	let filter_by: Priority[] = [Priority.Low, Priority.Medium, Priority.High];

	function push_task(task: Task) {
		tasks = [...tasks, task];
	}
	function tasks_in_order_and_age(tasks: Task[], priority: Priority[]) {
		if (priority) {
			return tasks.filter((task) => {
				console.log(priority);
				return priority.includes(task.priority);
			});
		} else {
			return tasks;
		}
	}

	$: sorted_tasks = tasks_in_order_and_age(tasks, filter_by);
	let priority: string = "Low";
	let name: string = "";
</script>

<h1 class="mt-4 font-bold">Todo list</h1>
<div class="flex flex-row">
	<input
		bind:value={name}
		type="text"
		placeholder="Task name"
		class="border border-gray-300 rounded-md p-2 mr-2"
	/>
	<select
		class="border border-gray-300 rounded-md px-2 mr-2"
		bind:value={priority}
	>
		<option>Low</option>
		<option>Medium</option>
		<option>High</option>
	</select>
	<button
		class="bg-blue-500 text-white rounded-md p-2"
		on:click={() => {
			push_task({
				name,
				priority: string_to_priority(priority),
			});
			name = "";
			priority = "Low";
		}}>Add</button
	>
</div>

<div class="mt-8 flex-col flex">
	{#if tasks.length == 0 || sorted_tasks.length == 0}
		<div />
	{:else}
		<div class="bg-slate-900 text-white p-2 rounded-md max-w-fit pr-8">
			<ul>
				{#each sorted_tasks as task, i}
					<li class="list-disc">
						<div class="flex flex-row my-1 items-center">
							<p class="mr-1 text-lg font-semibold">{task.name}</p>
							<p class="text-gray-500">{priority_to_string(task.priority)}</p>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
	<div class="flex flex-col mt-4 p-2 rounded-md ">
		<p class="mr-1">Include priorit{filter_by.length == 1 ? "y" : "ies"}:</p>
		{#each ["Low", "Medium", "High"] as priority, i}
			<label class="">
				<input type="checkbox" bind:group={filter_by} value={i} />
				{priority}
			</label>
		{/each}
	</div>
</div>
