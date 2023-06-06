<script lang="ts">
  import Document from '$lib/components/document/index.svelte'
  import type { Entry } from 'contentful'
	import type { ContactPerson, ContactPoint } from '$lib/clients/contentful'

  import type { PageData } from './$types'
  export let data: PageData

	let categories: { [category: string]: Entry<ContactPerson>[] }
	let points = data.page.fields.content.filter(contact => contact.sys.contentType.sys.id === 'contactPoint') as Entry<ContactPoint>[]

	$: {
		categories = data.page.fields.content.filter(contact => contact.sys.contentType.sys.id === 'contactPerson').reduce((cs, contact) => {
			if (cs[(contact as Entry<ContactPerson>).fields.category as string]) {
				return {
					...cs,
					[(contact as Entry<ContactPerson>).fields.category as string]: [...cs[(contact as Entry<ContactPerson>).fields.category as string], contact]
				}
			}
			return {
				...cs,
				[(contact as Entry<ContactPerson>).fields.category as string]: [contact]
			}
		}, {})
	}
</script>

<svelte:head>
	<title>{data.page.fields.title}</title>
</svelte:head>

<section>
	{#each Object.entries(categories) as [category, people]}
	<h2>{category}</h2>
	<nav>
		{#each people as person}
		<article>
			<h5>{person.fields.name}</h5>
			<h6>{person.fields.position}</h6>
			{#if person.fields.phone}<a href={`tel:${person.fields.phone}`}><h6>{person.fields.phone}</h6></a>{/if}
			{#if person.fields.email}<a href={`mailto:${person.fields.email}`}><h6>{@html person.fields.email.replace('@', '<div></div>@')}</h6></a>{/if}
		</article>
		{/each}
	</nav>
	{/each}

	<nav>
		{#each points as point}
		<a href={`${point.fields.link}`} rel="external">
			<h5>{point.fields.title}</h5>
			<h6>{point.fields.linkLabel}</h6>
		</a>
		{/each}
	</nav>
  <!-- <Document body={data.page.fields.body} /> -->
</section>

<style lang="scss">
	section {
		
	}

	h2,
	nav {
		margin-left: calc(33.3vw - (var(--gutter) / 3));

		@media (max-width: 900px) {
			margin-left: 0;
		}
	}

	h2 {
		margin-bottom: calc(var(--gutter) * 1);
	}

		nav {
			display: flex;
			flex-wrap: wrap;
			gap: var(--gutter);
			margin-bottom: calc(var(--gutter) * 1.5);

			&:last-child {
				margin-top: calc(var(--gutter) * 4.5);
			}

			article {
				width: calc(32% - (var(--gutter) / 2));

				@media (max-width: 900px) {
					width: calc(50% - (var(--gutter) / 2));
				}
			}
		}

			h5 {
				margin-bottom: calc(var(--rythm) / 2.5);

				@media (max-width: 900px) {
					font-size: var(--body);
				}
			}

			h6 {
				margin-bottom: 0;
				opacity: 0.5;
				transition: opacity 666ms;

				:global(div) {
					display: inline-block;
				}

				@media (max-width: 900px) {
					font-size: var(--tiny);
				}

				a:hover &,
				a:focus & {
					opacity: 1;
				}
			}
</style>