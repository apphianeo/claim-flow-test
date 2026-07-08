import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { policy, claimHistory, type ClaimRecord } from "@/data/mock";

function StatusText({ status }: { status: ClaimRecord["status"] }) {
  // Colors taken directly from the Claim History table design.
  return (
    <span
      className="text-sm"
      style={{ color: status === "Completed" ? "#34c759" : "#f09252" }}
    >
      {status}
    </span>
  );
}

/** Dashboard: policy information + claim history table (per node 1743:8540). */
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
          <Button variant="link" size="sm" className="shadow-none" onClick={onSignOut}>
            Sign out
          </Button>
        </div>

        {/* Policy information */}
        <section className="mt-6">
          <h2 className="mb-3 text-base font-bold text-foreground">
            Policy Information
          </h2>
          <Card className="border-black/[0.09] p-6">
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
        <section className="mt-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#212121]">
              Claim History
            </h2>
            <Button onClick={onAddClaim}>Add Claim</Button>
          </div>

          {/* Table — horizontal scroll on small screens (matches design) */}
          <div className="w-full overflow-x-auto">
            <div className="flex min-w-[900px] flex-col gap-2 bg-white">
              {/* Header */}
              <div className="flex items-center gap-6 px-3 py-1 text-sm font-semibold text-[#1e1e1e]">
                <span className="w-[220px] shrink-0">Benefit</span>
                <span className="w-[120px] shrink-0">Claim Reference</span>
                <span className="w-[100px] shrink-0">Creation Date</span>
                <span className="w-[100px] shrink-0">Submission Date</span>
                <span className="min-w-0 flex-1">Submission Status</span>
                <span className="w-[158px] shrink-0">Actions</span>
              </div>

              {/* Rows */}
              {claimHistory.map((c, i) => (
                <div
                  key={c.id}
                  className="flex items-center gap-6 rounded-[4px] p-3 text-sm font-normal text-[#1e1e1e]"
                  style={{
                    backgroundColor:
                      i % 2 === 0
                        ? "rgba(197,230,255,0.5)"
                        : "rgba(197,230,255,0.25)",
                  }}
                >
                  <span className="w-[220px] shrink-0">{c.benefit}</span>
                  <span className="w-[120px] shrink-0">{c.reference}</span>
                  <span className="w-[100px] shrink-0">{c.creationDate}</span>
                  <span className="w-[100px] shrink-0">{c.submissionDate}</span>
                  <span className="min-w-0 flex-1">
                    <StatusText status={c.status} />
                  </span>
                  <div className="flex w-[158px] shrink-0 items-center gap-3">
                    <Button size="sm">View</Button>
                    <Button size="sm" onClick={onAddClaim}>
                      Update
                    </Button>
                  </div>
                </div>
              ))}
            </div>
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
