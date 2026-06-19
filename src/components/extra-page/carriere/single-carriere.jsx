"use client";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Breadcrumb from "@/components/common/breadcrumb/breadcrumb";
import breadcrumb_bg from "@/assets/img/breadcrumb/aboutBanner.png";
import { useParams } from "next/navigation";

const MySwal = withReactContent(Swal);

const formatDate = (value) => {
  if (!value) return null;
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const ApplicationForm = ({ offer }) => {
  const attrs = offer?.attributes;
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    cv: null,
    custom: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomChange = (fieldKey, value) => {
    setForm((prev) => ({
      ...prev,
      custom: { ...prev.custom, [fieldKey]: value },
    }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, cv: e.target.files?.[0] || null }));
  };

  const alertSuccess = () => {
    MySwal.fire({
      title: "Candidature envoyée",
      text: "Merci ! Votre candidature a bien été reçue.",
      icon: "success",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const alertFailure = (message) => {
    MySwal.fire({
      title: "Erreur",
      text:
        message ||
        "Une erreur s'est produite. Veuillez réessayer plus tard.",
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.cv) {
      alertFailure("Veuillez joindre votre CV (PDF ou Word).");
      return;
    }

    const customResponses = (attrs?.formFields || [])
      .map((field) => ({
        fieldKey: field.fieldKey,
        fieldLabel: field.label,
        value: form.custom[field.fieldKey] || "",
      }))
      .filter((item) => item.value);

    const missingRequired = (attrs?.formFields || []).find(
      (field) => field.required && !form.custom[field.fieldKey]?.trim()
    );

    if (missingRequired) {
      alertFailure(`Le champ "${missingRequired.label}" est obligatoire.`);
      return;
    }

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        jobOfferId: offer.id,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        coverLetter: form.coverLetter,
        customResponses,
      })
    );
    formData.append("cv", form.cv);

    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/job-applications/submit`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setForm({
        fullName: "",
        email: "",
        phone: "",
        coverLetter: "",
        cv: null,
        custom: {},
      });
      e.target.reset();
      alertSuccess();
    } catch (error) {
      const message =
        error.response?.data?.error?.message ||
        error.response?.data?.data?.message ||
        error.response?.data?.message;
      alertFailure(message);
    } finally {
      setLoading(false);
    }
  };

  if (!attrs?.isOpen) {
    return (
      <p className="text-center text-danger">
        Cette offre n&apos;accepte plus de candidatures.
      </p>
    );
  }

  return (
    <form className="contact__form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="contact__input">
            <input
              type="text"
              name="fullName"
              placeholder="Nom complet *"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="contact__input">
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {attrs?.includePhone !== false && (
          <div className="col-md-6">
            <div className="contact__input">
              <input
                type="tel"
                name="phone"
                placeholder="Téléphone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        <div className="col-md-6">
          <div className="contact__input">
            <input
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              required
            />
            <small>CV (PDF ou Word, max 5 Mo) *</small>
          </div>
        </div>
        {attrs?.includeCoverLetter !== false && (
          <div className="col-md-12">
            <div className="contact__input">
              <textarea
                name="coverLetter"
                placeholder="Lettre de motivation"
                rows="5"
                value={form.coverLetter}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
        {(attrs?.formFields || []).map((field, index) => {
          const commonProps = {
            key: `${field.fieldKey}-${index}`,
            value: form.custom[field.fieldKey] || "",
            onChange: (e) => handleCustomChange(field.fieldKey, e.target.value),
            required: field.required,
            placeholder: `${field.label}${field.required ? " *" : ""}`,
          };

          if (field.fieldType === "textarea") {
            return (
              <div className="col-md-12" key={commonProps.key}>
                <div className="contact__input">
                  <textarea rows="4" {...commonProps} />
                </div>
              </div>
            );
          }

          if (field.fieldType === "select") {
            const options = (field.options || "")
              .split(",")
              .map((opt) => opt.trim())
              .filter(Boolean);

            return (
              <div className="col-md-6" key={commonProps.key}>
                <div className="contact__input">
                  <select
                    value={form.custom[field.fieldKey] || ""}
                    onChange={(e) =>
                      handleCustomChange(field.fieldKey, e.target.value)
                    }
                    required={field.required}
                  >
                    <option value="">{field.label}</option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          }

          return (
            <div className="col-md-6" key={commonProps.key}>
              <div className="contact__input">
                <input
                  type={
                    field.fieldType === "email"
                      ? "email"
                      : field.fieldType === "tel"
                        ? "tel"
                        : "text"
                  }
                  {...commonProps}
                />
              </div>
            </div>
          );
        })}
        <div className="col-md-12">
          <button type="submit" className="job-btn" disabled={loading}>
            {loading ? "Envoi en cours..." : "Envoyer ma candidature"}
          </button>
        </div>
      </div>
    </form>
  );
};

const SingleCarriere = () => {
  const id = useParams()?.id;
  const [offer, setOffer] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    const fetchOffer = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/job-offers?populate=*`,
          { headers: { "Content-Type": "application/json" } }
        );
        const found = response?.data?.data?.find(
          (item) => String(item.id) === String(id)
        );
        setOffer(found || null);
        setErrorMsg(found ? "" : "Cette offre n'existe pas.");
      } catch (error) {
        setErrorMsg(
          error.response?.data?.error?.message || error.toString()
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchOffer();
  }, [id]);

  const attrs = offer?.attributes;

  return (
    <main>
      <Breadcrumb
        title={attrs?.title || "Offre d'emploi"}
        subTitle="carrière"
        breadcrumb_bg={breadcrumb_bg.src}
        back="Carrières"
        backLink="/carriere"
      />

      <section className="career-area pt-115 pb-90">
        <div className="container">
          {isLoading && <p className="text-center">Chargement...</p>}
          {!isLoading && errorMsg && !offer && (
            <p className="text-center text-danger">{errorMsg}</p>
          )}
          {offer && (
            <div className="row">
              <div className="col-lg-7 mb-40">
                <div className="job-wrapper">
                  <div className="job-tag mb-20">
                    {attrs?.contractType && <span>{attrs.contractType}</span>}
                    {attrs?.department && <span>{attrs.department}</span>}
                    {attrs?.location && <span>{attrs.location}</span>}
                  </div>
                  <h2 className="mb-20">{attrs?.title}</h2>
                  {attrs?.deadline && (
                    <p className="mb-20">
                      <strong>Date limite :</strong> {formatDate(attrs.deadline)}
                    </p>
                  )}
                  {attrs?.description && (
                    <div
                      className="mb-30"
                      dangerouslySetInnerHTML={{ __html: attrs.description }}
                    />
                  )}
                  {attrs?.requirements && (
                    <>
                      <h4 className="mb-15">Profil recherché</h4>
                      <div
                        dangerouslySetInnerHTML={{ __html: attrs.requirements }}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="col-lg-5">
                <div className="job-wrapper">
                  <h3 className="mb-25">Postuler</h3>
                  <ApplicationForm offer={offer} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default SingleCarriere;
