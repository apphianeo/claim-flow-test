import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, Eye, X, Loader2, FileText } from "lucide-react";
import { requiredDocuments } from "@/data/mock";
import { type ClaimFormState, newId } from "./formState";

interface Props {
  form: ClaimFormState;
  update: (patch: Partial<ClaimFormState>) => void;
  onBack: () => void;
  onProceed: () => void;
}

const MAX_FILES = 10;

export function Step2Upload({ form, update, onBack, onProceed }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const incoming = Array.from(fileList).slice(
      0,
      MAX_FILES - form.files.length
    );
    // Simulate an upload round-trip so the loading state is visible.
    setUploading(true);
    setTimeout(() => {
      update({
        files: [
          ...form.files,
          ...incoming.map((f) => ({
            id: newId(),
            name: f.name,
            size: `${Math.max(1, Math.round(f.size / 1024))} KB`,
          })),
        ],
      });
      setUploading(false);
    }, 1200);
  };

  const removeFile = (id: string) =>
    update({ files: form.files.filter((f) => f.id !== id) });

  return (
    <div className="space-y-5">
      <p className="text-sm text-foreground">
        Ensure the required documents are submitted to prevent delays in
        processing your claims. Here are the documents required:
      </p>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {requiredDocuments.map((d) => (
          <li key={d} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
            <span>
              {d}
              <span className="text-destructive">*</span>
            </span>
          </li>
        ))}
      </ul>

      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed px-6 py-10 text-center transition-colors ${
          dragOver
            ? "border-primary bg-accent/50"
            : "border-input bg-muted/30 hover:bg-muted/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
        {uploading ? (
          <>
            <Loader2 className="h-7 w-7 animate-spin text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">Uploading…</p>
          </>
        ) : (
          <>
            <UploadCloud className="h-7 w-7 text-muted-foreground" />
            <p className="mt-3 text-sm text-foreground">
              Drop files here or{" "}
              <span className="font-semibold text-primary">click to upload</span>
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Upload up to 10 documents (max 10MB each)
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: JPG, PNG, PDF
            </p>
          </>
        )}
      </div>

      {/* Uploaded files */}
      {form.files.length > 0 && (
        <div className="space-y-2">
          {form.files.map((f) => (
            <div
              key={f.id}
              className="flex items-center gap-3 rounded-md border border-border px-3 py-2.5 text-sm"
            >
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 truncate">{f.name}</span>
              <span className="hidden text-xs text-muted-foreground sm:inline">
                {f.size}
              </span>
              <button
                type="button"
                title="Preview document"
                className="text-muted-foreground hover:text-primary"
                onClick={() => window.alert(`Preview: ${f.name}`)}
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                type="button"
                title="Remove"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => removeFile(f.id)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between pt-1">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onProceed} disabled={uploading}>
          Save &amp; Proceed
        </Button>
      </div>
    </div>
  );
}
