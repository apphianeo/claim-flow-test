import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { policy, claimHistory, type ClaimRecord } from "@/data/mock";
import { cn } from "@/lib/utils";

function StatusBadge({ status }: { status: ClaimRecord["status"] }) {
  return (
    <span
      className={cn(
        "text-sm font-medium",
        status === "Completed" ? "text-success" : "text-orange-500"
      )}
    >
      {status}
    </span>
  );
}

/** Dashboard: policy information + claim history, with "Add Claim" CTA. */
export function ClaimsMain({
  onAddClaim,
  onSignOut,
}: {
  onAddClaim: () => void;
  onSignOut: () => void;
}) {
  return (
    <Layout>
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">
            UniTravel Claim Submission
          </h1>
          <Button variant="link" className="px-0" onClick={onSignOut}>
            Sign out
          </Button>
        </div>

        {/* Policy information */}
        <section className="mt-6">
          <h2 className="mb-3 text-base font-bold text-foreground">
            Policy Information
          </h2>
          <Card className="p-6">
            <p className="text-lg font-bold text-foreground">
              {policy.productName}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Policy No: {policy.policyNo}
            </p>
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3">
              <Field label="Plan" value={policy.plan} />
              <Field label="Trip Type" value={policy.tripType} />
              <Field label="Group Type" value={policy.groupType} />
              <Field label="Destination" value={policy.destination} />
              <Field label="Policy Effective" value={policy.effective} />
              <Field label="Policy Expiry" value={policy.expiry} />
            </div>
          </Card>
        </section>

        {/* Claim history */}
        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">
              Claim History
            </h2>
            <Button onClick={onAddClaim}>Add Claim</Button>
          </div>

          {/* Desktop table */}
          <div className="mt-4 hidden overflow-hidden rounded-lg border border-border md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs font-bold text-foreground">
                  <th className="px-4 py-3">Benefit</th>
                  <th className="px-4 py-3">Claim Reference</th>
                  <th className="px-4 py-3">Creation Date</th>
                  <th className="px-4 py-3">Submission Date</th>
                  <th className="px-4 py-3">Submission Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {claimHistory.map((c, i) => (
                  <tr
                    key={c.id}
                    className={cn(i % 2 === 0 && "bg-accent/40")}
                  >
                    <td className="max-w-[220px] px-4 py-3 text-muted-foreground">
                      {c.benefit}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {c.reference}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {c.creationDate}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {c.submissionDate}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button size="sm" className="h-8 px-4">
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="h-8 px-4"
                          onClick={onAddClaim}
                        >
                          Update
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="mt-4 space-y-3 md:hidden">
            {claimHistory.map((c) => (
              <Card key={c.id} className="p-4">
                <p className="text-sm font-semibold text-foreground">
                  {c.benefit}
                </p>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <MobileRow label="Reference" value={c.reference} />
                  <MobileRow label="Created" value={c.creationDate} />
                  <MobileRow label="Submitted" value={c.submissionDate} />
                  <div>
                    <dt className="text-muted-foreground">Status</dt>
                    <dd>
                      <StatusBadge status={c.status} />
                    </dd>
                  </div>
                </dl>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="h-8 flex-1">
                    View
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 flex-1"
                    onClick={onAddClaim}
                  >
                    Update
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function MobileRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
