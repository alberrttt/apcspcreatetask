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
	function tasks_in_order_and_age(
		tasks: Task[],
		priorities: Priority[] | undefined
	) {
		if (priorities != undefined) {
			return tasks.filter((task) => {
				// check if that task's priority is in the priority to filter by
				for (const priority of priorities) {
					if (task.priority == priority) return true;
				}
			});
		} else {
			return tasks;
		}
	}

	$: len_of_sorted_tasks = tasks_in_order_and_age(tasks, filter_by).length;
	let priority: string = "Low";
	let name: string = "";
</script>

<h1 class="mt-4 font-bold">Todo list</h1>
<div class="flex flex-row mb-2">
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

{#if tasks.length == 0 || len_of_sorted_tasks == 0}
	<!-- there are no tasks to display, so create an empty div -->
	<div />
{:else}
	<div class="bg-slate-900 text-white mb-2 p-2 rounded-md max-w-fit pr-8">
		<ul>
			{#each tasks_in_order_and_age(tasks, filter_by) as task, i}
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
<div class="flex flex-col p-2 rounded-md top-56 absolute">
	<p class="mr-1">Include priorities:</p>
	{#each ["Low", "Medium", "High"] as priority, i}
		<label class="">
			<input type="checkbox" bind:group={filter_by} value={i} />
			{priority}
		</label>
	{/each}
</div>
