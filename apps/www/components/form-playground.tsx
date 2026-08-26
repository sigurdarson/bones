import * as React from "react";
import {
  Button,
  FieldError,
  FieldLabel,
  FieldRoot,
  Form,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Switch,
} from "@usebones/react";
import { Showcase } from "./showcase";
import { Controls, ControlRow } from "./controls";

type ValidationMode = "onSubmit" | "onBlur" | "onChange";

const modes: Record<ValidationMode, string> = {
  onSubmit: "On submit",
  onBlur: "On blur",
  onChange: "On change",
};

const serverErrorText = "That address is already subscribed.";

interface PlaygroundState {
  mode: ValidationMode;
  serverError: boolean;
}

/* The Code tab mirrors whatever the controls currently show. */
function buildCode({ mode, serverError }: PlaygroundState): string {
  const formAttrs = [
    mode !== "onSubmit" ? `\n  validationMode="${mode}"` : "",
    serverError ? `\n  errors={{ email: "${serverErrorText}" }}` : "",
    `\n  onFormSubmit={(values) => subscribe(values.email)}`,
  ].join("");
  return `import {
  Button,
  FieldError,
  FieldLabel,
  FieldRoot,
  Form,
  Input,
} from "@usebones/react";

<Form${formAttrs}
>
  <FieldRoot name="email">
    <FieldLabel>Email</FieldLabel>
    <Input type="email" required placeholder="you@example.com" />
    <FieldError match="valueMissing">Enter your email.</FieldError>
    <FieldError match="typeMismatch">
      That doesn't look like an email address.
    </FieldError>${serverError ? "\n    <FieldError />" : ""}
  </FieldRoot>
  <Button type="submit">Subscribe</Button>
</Form>`;
}

export function FormPlayground() {
  const [mode, setMode] = React.useState<ValidationMode>("onSubmit");
  const [serverError, setServerError] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState<string | null>(null);

  return (
    <>
      <Showcase
        code={buildCode({ mode, serverError })}
        note={
          <>
            <code>onFormSubmit</code> only fires once every field passes
            validation; the <code>errors</code> prop maps server errors
            back onto fields by <code>name</code>.
          </>
        }
      >
        <div style={{ width: "18rem" }}>
          <Form
            validationMode={mode}
            errors={serverError ? { email: serverErrorText } : undefined}
            onFormSubmit={(values) => setSubscribed(String(values.email))}
          >
            <FieldRoot name="email">
              <FieldLabel>Email</FieldLabel>
              <Input type="email" required placeholder="you@example.com" />
              <FieldError match="valueMissing">Enter your email.</FieldError>
              <FieldError match="typeMismatch">
                That doesn't look like an email address.
              </FieldError>
              {serverError ? <FieldError /> : null}
            </FieldRoot>
            <Button type="submit">Subscribe</Button>
            {subscribed ? (
              <p
                style={{
                  margin: 0,
                  fontSize: "0.875rem",
                  color: "var(--ub-success)",
                }}
              >
                Subscribed {subscribed}.
              </p>
            ) : null}
          </Form>
        </div>
      </Showcase>
      <Controls>
        <ControlRow label="Validate">
          <SelectRoot
            size="compact"
            items={modes}
            value={mode}
            onValueChange={(value) => value && setMode(value as ValidationMode)}
          >
            <SelectTrigger variant="borderless" />
            <SelectContent>
              {(Object.keys(modes) as ValidationMode[]).map((value) => (
                <SelectItem key={value} value={value}>
                  {modes[value]}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </ControlRow>
        <ControlRow label="Server error">
          <Switch checked={serverError} onCheckedChange={setServerError} />
        </ControlRow>
      </Controls>
    </>
  );
}
