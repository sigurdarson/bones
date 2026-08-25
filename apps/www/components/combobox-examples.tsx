"use client";

import * as React from "react";
import {
  ComboboxChip,
  ComboboxChips,
  ComboboxCollection,
  ComboboxContent,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxValue,
} from "@usebones/react";
import { Showcase } from "./showcase";

/* ---------- Multiple select ---------- */

const skills = [
  "TypeScript",
  "CSS",
  "React",
  "Rust",
  "Go",
  "Python",
  "Accessibility",
  "Motion",
];

const multipleCode = `<ComboboxRoot items={skills} multiple defaultValue={["TypeScript", "CSS"]}>
  <ComboboxChips>
    <ComboboxValue>
      {(values: string[]) => (
        <>
          {values.map((value) => (
            <ComboboxChip key={value}>{value}</ComboboxChip>
          ))}
          <ComboboxInput
            placeholder={values.length === 0 ? "Add skills..." : ""}
            clearable={false}
          />
        </>
      )}
    </ComboboxValue>
  </ComboboxChips>
  <ComboboxContent empty="No skills found.">
    {(skill) => (
      <ComboboxItem key={skill} value={skill}>
        {skill}
      </ComboboxItem>
    )}
  </ComboboxContent>
</ComboboxRoot>`;

export function ComboboxMultiple() {
  return (
    <Showcase
      code={multipleCode}
      note={
        <>
          multiple turns the value into an array; ComboboxChips renders it
          as removable chips with the input inline. Items stay in the list
          with a check, so selections toggle.
        </>
      }
    >
      <div style={{ width: "22rem" }}>
        <ComboboxRoot items={skills} multiple defaultValue={["TypeScript", "CSS"]}>
          <ComboboxChips>
            <ComboboxValue>
              {(values: string[]) => (
                <>
                  {values.map((value) => (
                    <ComboboxChip key={value}>{value}</ComboboxChip>
                  ))}
                  <ComboboxInput
                    aria-label="Skills"
                    placeholder={values.length === 0 ? "Add skills..." : ""}
                    clearable={false}
                  />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent empty="No skills found.">
            {(skill: string) => (
              <ComboboxItem key={skill} value={skill}>
                {skill}
              </ComboboxItem>
            )}
          </ComboboxContent>
        </ComboboxRoot>
      </div>
    </Showcase>
  );
}

/* ---------- Input inside popup ---------- */

const cities = [
  "Reykjavík",
  "London",
  "Berlin",
  "New York",
  "Tokyo",
  "Sydney",
  "São Paulo",
];

const popupInputCode = `<ComboboxRoot items={cities}>
  <ComboboxTrigger placeholder="Choose a city" aria-label="Time zone" />
  <ComboboxContent searchInput="Search cities..." empty="No cities found.">
    {(city) => (
      <ComboboxItem key={city} value={city}>
        {city}
      </ComboboxItem>
    )}
  </ComboboxContent>
</ComboboxRoot>`;

export function ComboboxPopupInput() {
  return (
    <Showcase
      code={popupInputCode}
      note={
        <>
          ComboboxTrigger reads like a Select (it reuses its styling);
          typing happens inside the popup via <code>searchInput</code> on
          the content. The placeholder is visual only: name the trigger
          with aria-label or a Field label.
        </>
      }
    >
      <ComboboxRoot items={cities}>
        <ComboboxTrigger placeholder="Choose a city" aria-label="Time zone" />
        <ComboboxContent searchInput="Search cities..." empty="No cities found.">
          {(city: string) => (
            <ComboboxItem key={city} value={city}>
              {city}
            </ComboboxItem>
          )}
        </ComboboxContent>
      </ComboboxRoot>
    </Showcase>
  );
}

/* ---------- Grouped ---------- */

const produce = [
  { value: "Fruits", items: ["Apple", "Banana", "Mango", "Orange"] },
  { value: "Vegetables", items: ["Broccoli", "Carrot", "Kale", "Leek"] },
];

const groupedCode = `const produce = [
  { value: "Fruits", items: ["Apple", "Banana", "Mango", "Orange"] },
  { value: "Vegetables", items: ["Broccoli", "Carrot", "Kale", "Leek"] },
];

<ComboboxRoot items={produce}>
  <ComboboxInput placeholder="Select produce" />
  <ComboboxContent empty="Nothing in season.">
    {(group) => (
      <ComboboxGroup key={group.value} items={group.items}>
        <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
        <ComboboxCollection>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxCollection>
      </ComboboxGroup>
    )}
  </ComboboxContent>
</ComboboxRoot>`;

export function ComboboxGrouped() {
  return (
    <Showcase
      code={groupedCode}
      note={
        <>
          Grouped items nest: the root's items are groups, function
          children receive each group, and ComboboxCollection renders the
          group's own items. Filtering works through the groups.
        </>
      }
    >
      <ComboboxRoot items={produce}>
        <ComboboxInput placeholder="Select produce" aria-label="Produce" />
        <ComboboxContent empty="Nothing in season.">
          {(group: (typeof produce)[number]) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxContent>
      </ComboboxRoot>
    </Showcase>
  );
}

/* ---------- Async search ---------- */

interface Person {
  name: string;
  email: string;
  handle: string;
  title: string;
}

const people: Person[] = [
  { name: "Gunnar Hámundarson", email: "gunnar@example.com", handle: "@gunnar", title: "Champion" },
  { name: "Njáll Þorgeirsson", email: "njall@example.com", handle: "@njall", title: "Lawyer" },
  { name: "Guðrún Ósvífursdóttir", email: "gudrun@example.com", handle: "@gudrun", title: "Matriarch" },
  { name: "Egill Skallagrímsson", email: "egill@example.com", handle: "@egill", title: "Poet" },
  { name: "Auður djúpúðga", email: "audur@example.com", handle: "@audur", title: "Settler" },
  { name: "Snorri goði", email: "snorri@example.com", handle: "@snorri", title: "Chieftain" },
];

function useFakeSearch() {
  const [results, setResults] = React.useState<Person[]>([]);
  const [searching, setSearching] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  function search(query: string) {
    clearTimeout(timer.current);
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setSearching(false);
      setResults([]);
      return;
    }
    setSearching(true);
    timer.current = setTimeout(() => {
      setResults(
        people.filter((person) =>
          person.name.toLowerCase().includes(trimmed),
        ),
      );
      setSearching(false);
    }, 400);
  }

  return { results, searching, search };
}

function PersonRow({ person }: { person: Person }) {
  return (
    <ComboboxItem
      value={person}
      style={{ height: "auto", alignItems: "flex-start", padding: "0.5rem 0.75rem" }}
    >
      <span style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}>
        <span style={{ fontWeight: 500 }}>{person.name}</span>
        <span style={{ fontSize: "0.75rem", color: "var(--ub-text-secondary)" }}>
          {person.email}
        </span>
        <span style={{ fontSize: "0.75rem", color: "var(--ub-text-secondary)" }}>
          {person.handle} · {person.title}
        </span>
      </span>
    </ComboboxItem>
  );
}

const asyncSingleCode = `const { results, searching, search } = useSearch();

<ComboboxRoot
  items={results}
  itemToStringLabel={(person) => person.name}
  onInputValueChange={search}
>
  <ComboboxInput placeholder="e.g. Gunnar" />
  <ComboboxContent
    status={searching ? "Searching..." : ""}
    empty={searching ? null : "No people found."}
  >
    {(person) => <PersonRow key={person.email} person={person} />}
  </ComboboxContent>
</ComboboxRoot>`;

export function ComboboxAsyncSingle() {
  const { results, searching, search } = useFakeSearch();
  return (
    <Showcase
      code={asyncSingleCode}
      note={
        <>
          Fetch on <code>onInputValueChange</code> and hand the results to
          items; the status line announces politely while searching. This
          demo fakes the request with a delay.
        </>
      }
    >
      <div style={{ width: "20rem" }}>
        <ComboboxRoot
          items={results}
          itemToStringLabel={(person: Person) => person.name}
          onInputValueChange={search}
        >
          <ComboboxInput placeholder="e.g. Gunnar" aria-label="Assign reviewer" />
          <ComboboxContent
            status={searching ? "Searching..." : ""}
            empty={searching ? null : "No people found."}
          >
            {(person: Person) => <PersonRow key={person.email} person={person} />}
          </ComboboxContent>
        </ComboboxRoot>
      </div>
    </Showcase>
  );
}

const asyncMultipleCode = `<ComboboxRoot
  items={results}
  multiple
  itemToStringLabel={(person) => person.name}
  onInputValueChange={search}
>
  <ComboboxChips>
    <ComboboxValue>
      {(values: Person[]) => (
        <>
          {values.map((person) => (
            <ComboboxChip key={person.email}>{person.name}</ComboboxChip>
          ))}
          <ComboboxInput placeholder="Add reviewers..." clearable={false} />
        </>
      )}
    </ComboboxValue>
  </ComboboxChips>
  <ComboboxContent
    status={searching ? "Searching..." : ""}
    empty={searching ? null : "No people found."}
  >
    {(person) => <PersonRow key={person.email} person={person} />}
  </ComboboxContent>
</ComboboxRoot>`;

export function ComboboxAsyncMultiple() {
  const { results, searching, search } = useFakeSearch();
  return (
    <Showcase
      code={asyncMultipleCode}
      note={
        <>
          The same async pattern with multiple: picked people stay as
          chips while new searches stream fresh results into the list.
        </>
      }
    >
      <div style={{ width: "22rem" }}>
        <ComboboxRoot
          items={results}
          multiple
          itemToStringLabel={(person: Person) => person.name}
          onInputValueChange={search}
        >
          <ComboboxChips>
            <ComboboxValue>
              {(values: Person[]) => (
                <>
                  {values.map((person) => (
                    <ComboboxChip key={person.email}>{person.name}</ComboboxChip>
                  ))}
                  <ComboboxInput
                    aria-label="Reviewers"
                    placeholder="Add reviewers..."
                    clearable={false}
                  />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent
            status={searching ? "Searching..." : ""}
            empty={searching ? null : "No people found."}
          >
            {(person: Person) => <PersonRow key={person.email} person={person} />}
          </ComboboxContent>
        </ComboboxRoot>
      </div>
    </Showcase>
  );
}

/* ---------- Creatable ---------- */

const creatableCode = `const [labels, setLabels] = React.useState(["bug", "docs", "enhancement"]);
const [query, setQuery] = React.useState("");

const visible = labels.filter((label) =>
  label.toLowerCase().includes(query.trim().toLowerCase()),
);
const canCreate =
  query.trim() !== "" && !labels.includes(query.trim().toLowerCase());
/* Registering the create row in items gives it the same highlight and
   keyboard navigation as the real rows. */
const listItems = canCreate ? [...visible, query.trim().toLowerCase()] : visible;

<ComboboxRoot
  items={listItems}
  multiple
  onInputValueChange={setQuery}
  onValueChange={(next) =>
    setLabels((current) => [
      ...current,
      ...next.filter((label) => !current.includes(label)),
    ])
  }
>
  <ComboboxChips>{/* chips + input, as in Multiple select */}</ComboboxChips>
  <ComboboxContent>
    {visible.map((label) => (
      <ComboboxItem key={label} value={label}>
        {label}
      </ComboboxItem>
    ))}
    {canCreate ? (
      <ComboboxItem value={query.trim().toLowerCase()}>
        Create "{query.trim().toLowerCase()}"
      </ComboboxItem>
    ) : null}
  </ComboboxContent>
</ComboboxRoot>`;

export function ComboboxCreatable() {
  const [labels, setLabels] = React.useState([
    "bug",
    "docs",
    "enhancement",
    "help wanted",
  ]);
  const [query, setQuery] = React.useState("");

  const normalized = query.trim().toLowerCase();
  const visible = labels.filter((label) => label.includes(normalized));
  const canCreate = normalized !== "" && !labels.includes(normalized);
  const listItems = canCreate ? [...visible, normalized] : visible;

  return (
    <Showcase
      code={creatableCode}
      note={
        <>
          Manage the items yourself and append a create row when the query
          matches nothing; selecting it adds the label and keeps it
          chosen.
        </>
      }
    >
      <div style={{ width: "22rem" }}>
        <ComboboxRoot
          items={listItems}
          multiple
          defaultValue={["enhancement"]}
          onInputValueChange={setQuery}
          onValueChange={(next: string[]) =>
            setLabels((current) => [
              ...current,
              ...next.filter((label) => !current.includes(label)),
            ])
          }
        >
          <ComboboxChips>
            <ComboboxValue>
              {(values: string[]) => (
                <>
                  {values.map((value) => (
                    <ComboboxChip key={value}>{value}</ComboboxChip>
                  ))}
                  <ComboboxInput
                    aria-label="Labels"
                    placeholder={values.length === 0 ? "Add labels..." : ""}
                    clearable={false}
                  />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent>
            {visible.map((label) => (
              <ComboboxItem key={label} value={label}>
                {label}
              </ComboboxItem>
            ))}
            {canCreate ? (
              <ComboboxItem key={`create-${normalized}`} value={normalized}>
                Create "{normalized}"
              </ComboboxItem>
            ) : null}
          </ComboboxContent>
        </ComboboxRoot>
      </div>
    </Showcase>
  );
}
