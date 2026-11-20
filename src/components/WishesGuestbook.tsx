import { useState, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import {
  validateWishInput,
  type WeddingWish,
} from '../utils/wishesStore';

interface WishesGuestbookProps {
  wishes: WeddingWish[];
  onAddWish: (name: string, relation: string, message: string) => void;
}

export function WishesGuestbook({ wishes, onAddWish }: WishesGuestbookProps) {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({});
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validateWishInput(name, message);
    if (!validation.valid) {
      setErrors(validation.errors);
      setSubmittedNotice(false);
      return;
    }

    onAddWish(name, relation, message);
    setName('');
    setRelation('');
    setMessage('');
    setErrors({});
    setSubmittedNotice(true);
  };

  return (
    <section
      id="blessings"
      className="mx-auto max-w-[1200px] px-6 pt-8 pb-20 sm:pt-12 sm:pb-24"
    >
      <div className="mb-10 border-b border-[#D4AF37]/20 pb-6">
        <p className="text-xs font-medium tracking-[0.2em] text-[#D4AF37]">
          Heartfelt Blessings
        </p>
        <h2 className="font-display mt-2 text-balance text-3xl font-semibold text-[#F5EFE6] sm:text-4xl">
          Wishes for Nayon &amp; Nowsin
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Form Column */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="h-fit border border-[#D4AF37]/25 bg-[#12100E]/92 p-7 lg:col-span-5"
        >
          <h3 className="font-display text-2xl font-semibold text-[#F5E4A8]">
            Leave a Wedding Blessing
          </h3>
          <p className="mt-1.5 text-sm text-[#C7BFA9]">
            Your heartfelt prayer or note becomes part of their keepsake wall
            and launches a celebratory firework.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="wish-name"
                className="block text-xs font-medium text-[#E7DEC8]"
              >
                Your Name <span className="text-[#E8A0B0]">*</span>
              </label>
              <input
                id="wish-name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) {
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }
                }}
                placeholder="e.g. Tariq & Maliha"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'wish-name-error' : undefined}
                className="mt-2 w-full border border-[#D4AF37]/25 bg-[#090807] px-3.5 py-2.5 text-sm text-[#F5EFE6] placeholder:text-[#7E7666] focus:border-[#D4AF37] focus:outline-none"
              />
              {errors.name && (
                <p
                  id="wish-name-error"
                  role="alert"
                  className="mt-1.5 text-xs text-[#F4A5B5]"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="wish-relation"
                className="block text-xs font-medium text-[#E7DEC8]"
              >
                Relationship (Optional)
              </label>
              <input
                id="wish-relation"
                name="relation"
                type="text"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                placeholder="e.g. Groom’s Brother, Childhood Friend"
                className="mt-2 w-full border border-[#D4AF37]/25 bg-[#090807] px-3.5 py-2.5 text-sm text-[#F5EFE6] placeholder:text-[#7E7666] focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="wish-message"
                className="block text-xs font-medium text-[#E7DEC8]"
              >
                Heartfelt Wish <span className="text-[#E8A0B0]">*</span>
              </label>
              <textarea
                id="wish-message"
                name="message"
                rows={4}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) {
                    setErrors((prev) => ({ ...prev, message: undefined }));
                  }
                }}
                placeholder="Write a warm blessing for Nayon & Nowsin..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? 'wish-message-error' : undefined
                }
                className="mt-2 w-full resize-y border border-[#D4AF37]/25 bg-[#090807] px-3.5 py-2.5 text-sm text-[#F5EFE6] placeholder:text-[#7E7666] focus:border-[#D4AF37] focus:outline-none"
              />
              {errors.message && (
                <p
                  id="wish-message-error"
                  role="alert"
                  className="mt-1.5 text-xs text-[#F4A5B5]"
                >
                  {errors.message}
                </p>
              )}
            </div>

            {submittedNotice && (
              <p
                role="status"
                className="border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-2.5 text-xs font-medium text-[#F5E4A8]"
              >
                Your blessing has been added to Nayon &amp; Nowsin’s keepsake wall.
              </p>
            )}

            <button
              type="submit"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 whitespace-nowrap bg-gradient-to-r from-[#C89B2B] via-[#EBD286] to-[#C89B2B] px-5 py-3 text-sm font-semibold text-[#120F0A] transition-transform duration-150 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5E4A8]"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>Send Blessing</span>
            </button>
          </div>
        </form>

        {/* Wishes Feed Column */}
        <div
          data-testid="wishes-list"
          className="space-y-4 lg:col-span-7"
        >
          {wishes.map((wish) => (
            <article
              key={wish.id}
              className="border border-[#D4AF37]/18 bg-[#12100E]/82 p-6 bg-[#12100E]/90"
            >
              <p className="text-base leading-relaxed text-[#F5EFE6]">
                “{wish.message}”
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#C7BFA9]">
                <span className="font-semibold text-[#F5E4A8]">
                  {wish.name}
                </span>
                <span aria-hidden="true">·</span>
                <span>{wish.relation}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{wish.createdAt}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
