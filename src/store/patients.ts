import { manage } from "manate"
import { SAMPLE_PATIENTS } from "../data/patients"
import type { Patient } from "../types"

export class PatientStore {
  public patients: Patient[] = SAMPLE_PATIENTS
  public selectedPatient: Patient | null = null
  public searchTerm = ""

  public get filteredPatients() {
    if (!this.searchTerm) return this.patients

    return this.patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        patient.phone.includes(this.searchTerm) ||
        patient.email.toLowerCase().includes(this.searchTerm.toLowerCase()),
    )
  }

  public selectPatient(patient: Patient) {
    this.selectedPatient = patient
  }

  public clearSelection() {
    this.selectedPatient = null
  }

  public setSearchTerm(term: string) {
    this.searchTerm = term
  }

  public addPatient(patient: Patient) {
    this.patients.push(patient)
  }

  public updatePatient(id: string, updates: Partial<Patient>) {
    const index = this.patients.findIndex((p) => p.id === id)
    if (index !== -1) {
      this.patients[index] = { ...this.patients[index], ...updates }
      if (this.selectedPatient?.id === id) {
        this.selectedPatient = this.patients[index]
      }
    }
  }

  public deletePatient(id: string) {
    this.patients = this.patients.filter((p) => p.id !== id)
    if (this.selectedPatient?.id === id) {
      this.selectedPatient = null
    }
  }
}

export const patientStore = manage(new PatientStore())
