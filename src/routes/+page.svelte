<script lang="ts">
	import TrashcanIcon from "./trashcanicon.svelte";

	interface Task {
		name: string;
		priority: Priority;
	}

	enum Priority {
		Low,
		Medium,
		High,
	}
	// utility functions to convert between the string and enum
	function string_to_priority(s: string): Priority {
		switch (s) {
			case "Low":
				return Priority.Low;
			case "Medium":
				return Priority.Medium;
			case "High":
				return Priority.High;
		}

		throw new Error("Invalid priority");
	}
	function priority_to_string(p: Priority): string {
		switch (p) {
			case Priority.Low:
				return "Low";
			case Priority.Medium:
				return "Medium";
			case Priority.High:
				return "High";
		}
		throw new Error("Invalid priority");
	}

	let tasks = new Array<Task>();
	function filter_tasks(
		tasks: Task[],
		low: boolean,
		medium: boolean,
		high: boolean
	): Task[] {
		let filtered = new Array<Task>();
		for (const [i, task] of tasks.entries()) {
			// check if that task's priority is one of the chosen priorities
			if (
				(task.priority == Priority.Low && low) ||
				(task.priority == Priority.Medium && medium)
			) {
				filtered.push(task);
			} else if (task.priority == Priority.High && high) {
				filtered = [task, ...filtered];
			}
		}
		return filtered;
	}
	let low = true;
	let medium = true;
	let high = true;
	$: len_of_sorted_tasks = filter_tasks(tasks, low, medium, high).length;
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
		class="add-button"
		on:click={() => {
			// "name" and "priority" are variables that are binded to the UI inputs
			tasks.push({
				name,
				priority: string_to_priority(priority),
			});
			// reassign the array to itself
			// to trigger a re-render (its how svelte works)
			tasks = tasks;
			// reset the inputs
			name = "";
			priority = "Low";
		}}
		>Add
	</button>
</div>
{#if tasks.length == 0 || len_of_sorted_tasks == 0}
	<!-- there are no tasks to display, so show an empty div -->
	<div />
{:else}
	<div class="bg-slate-900 text-white mb-2 p-2 rounded-md max-w-fit">
		<ul>
			<!-- this statement calls the procedure and iterates through the return value, creating a UI element for each entry -->
			{#each filter_tasks(tasks, low, medium, high) as task, i}
				<li class="list-disc">
					<div class="flex flex-row my-1 items-center">
						<div class="flex flex-row items-center">
							<p class="mr-1 text-lg font-semibold">{task.name}</p>
							<p class="text-gray-500">{priority_to_string(task.priority)}</p>
						</div>
						<button
							class="cursor-pointer"
							on:click={() => {
								tasks.splice(i, 1);
								// svelete needs this to re-render
								tasks = tasks;
							}}
						>
							<TrashcanIcon />
						</button>
					</div>
				</li>
			{/each}
		</ul>
	</div>
{/if}
<div class="flex flex-col p-2 rounded-md top-56 absolute">
	<p class="mr-1">Include priorities:</p>

	<label class="">
		<input type="checkbox" bind:checked={low} />
		Low
	</label>
	<label class="">
		<input type="checkbox" bind:checked={medium} />
		Medium
	</label>
	<label class="">
		<input type="checkbox" bind:checked={high} />
		High
	</label>
</div>